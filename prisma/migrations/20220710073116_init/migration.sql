-- CreateTable
CREATE TABLE `user` (
    `iduser` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NULL,
    `age` INTEGER NULL,
    `address` VARCHAR(250) NULL,

    PRIMARY KEY (`iduser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
