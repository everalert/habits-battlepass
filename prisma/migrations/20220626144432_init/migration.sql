-- CreateTable
CREATE TABLE "Category" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "icon" STRING NOT NULL,
    "description" STRING,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" STRING NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "length" INT4 NOT NULL DEFAULT 7862400,
    "title" STRING NOT NULL,
    "description" STRING,
    "levelGoal" INT4 NOT NULL DEFAULT 100,
    "levelMax" INT4 NOT NULL,
    "levelXP" INT4 NOT NULL DEFAULT 10000,
    "currentXP" INT4 NOT NULL DEFAULT 0,
    "currentLevel" INT4 NOT NULL DEFAULT 0,
    "color1" STRING,
    "color2" STRING,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" STRING NOT NULL,
    "seasonId" STRING NOT NULL,
    "categoryId" STRING NOT NULL,
    "lagActivityId" STRING NOT NULL,
    "lagStartValue" FLOAT8 NOT NULL,
    "lagEndValue" FLOAT8 NOT NULL,
    "lagProjectionCurve" STRING,
    "note" STRING,
    "currentXP" INT4 NOT NULL DEFAULT 0,
    "seasonXpRatio" FLOAT8 NOT NULL DEFAULT 0.25,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" STRING NOT NULL,
    "goalId" STRING NOT NULL,
    "activityId" STRING NOT NULL,
    "label" STRING NOT NULL DEFAULT E'{UNIT} of {ACTIVITY}',
    "target" FLOAT8 NOT NULL,
    "taskXP" INT4 NOT NULL,
    "period" STRING NOT NULL,
    "isTemplate" BOOL NOT NULL DEFAULT true,
    "note" STRING,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" STRING NOT NULL,
    "unitId" STRING NOT NULL,
    "label" STRING NOT NULL,
    "isCumulative" BOOL NOT NULL DEFAULT true,
    "note" STRING,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" STRING NOT NULL,
    "activityId" STRING NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" FLOAT8 NOT NULL,
    "note" STRING,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" STRING NOT NULL,
    "seasonId" STRING NOT NULL,
    "label" STRING NOT NULL,
    "level" INT4 NOT NULL,
    "isClaimed" BOOL NOT NULL DEFAULT false,
    "note" STRING,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityUnit" (
    "id" STRING NOT NULL,
    "type" STRING NOT NULL,
    "unit" STRING,

    CONSTRAINT "ActivityUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityVariation" (
    "id" STRING NOT NULL,
    "label" STRING NOT NULL,
    "activityId" STRING NOT NULL,

    CONSTRAINT "ActivityVariation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityVariationCombo" (
    "id" STRING NOT NULL,
    "activityId" STRING NOT NULL,
    "variationId" STRING NOT NULL,

    CONSTRAINT "ActivityVariationCombo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_lagActivityId_fkey" FOREIGN KEY ("lagActivityId") REFERENCES "ActivityVariationCombo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityVariationCombo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "ActivityUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityVariationCombo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityVariation" ADD CONSTRAINT "ActivityVariation_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityVariationCombo" ADD CONSTRAINT "ActivityVariationCombo_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityVariationCombo" ADD CONSTRAINT "ActivityVariationCombo_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "ActivityVariation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
