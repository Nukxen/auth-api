-- CreateTable
CREATE TABLE "rg_users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rg_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rg_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rg_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qq_verification_codes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullfilled_at" TIMESTAMP(3),

    CONSTRAINT "qq_verification_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rg_users_email_key" ON "rg_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "qq_verification_codes_user_id_key" ON "qq_verification_codes"("user_id");

-- AddForeignKey
ALTER TABLE "rg_sessions" ADD CONSTRAINT "rg_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "rg_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qq_verification_codes" ADD CONSTRAINT "qq_verification_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "rg_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
