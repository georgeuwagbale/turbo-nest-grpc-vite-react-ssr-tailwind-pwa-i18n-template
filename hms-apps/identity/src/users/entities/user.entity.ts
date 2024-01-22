import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('_user')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ unique: true })
    primaryEmailAddress: string;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    middleName?: string | undefined;

    @Column()
    lastName: string;

    @Column()
    passwordHash: string;

    @Column()
    backupEmailAddress: string;

    @Column({ nullable: true })
    // phone: { [key: string]: any } | undefined;
    phone: string | undefined;

    @Column({ default: false })
    isPrimaryEmailAddressVerified: boolean;

    @Column({ default: false })
    isBackupEmailAddressVerified: boolean;
}
