import * as XLSX from 'xlsx';

export function ExportDataToODS(data) {
	const workbook = XLSX.utils.book_new();
	const keys = Object.keys(data);
	keys.forEach(k => {
		const worksheet = XLSX.utils.json_to_sheet(data[k])
		XLSX.utils.book_append_sheet(workbook, worksheet, k);
	});
	//console.log(workbook);
	XLSX.writeFile(workbook, 'battlepass-scoreboard.ods');
}