-- CreateTable
CREATE TABLE `invoices` (
    `invoice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `userId_idx`(`userId`),
    PRIMARY KEY (`invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user`(`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
