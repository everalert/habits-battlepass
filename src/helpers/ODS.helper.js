import * as XLSX from 'xlsx';

export function ExportDataToODS(data) {
	const workbook = XLSX.utils.book_new();
	const keys = Object.keys(data);
	keys.forEach(k => {
		const worksheet = XLSX.utils.json_to_sheet(data[k])
		XLSX.utils.book_append_sheet(workbook, worksheet, k);
	});
	XLSX.writeFile(workbook, 'battlepass-scoreboard.ods');
}

export async function ImportDataFromODS(file, bases) {
	if (file.type !== "application/vnd.oasis.opendocument.spreadsheet") return false;

	const data = await file.arrayBuffer();
	const workbook = XLSX.read(data);

	let isValid = true;
	let baseWorksheetNames = Object.keys(bases);
	baseWorksheetNames.forEach(n => {
		if (!isValid) return;
		if (workbook.SheetNames.includes(n)) {
			const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[n]);
			workbook.Sheets[n] = sheet;
			const baseKeys = Object.keys(bases[n]);
			const dataKeys = Object.keys(sheet[0]);
			baseKeys.forEach(k => {
				if (!isValid) return;
				isValid &&= dataKeys.includes(k);
			});
		} else
			isValid = false;
	});
	if (!isValid) return false;
	return workbook.Sheets;
}