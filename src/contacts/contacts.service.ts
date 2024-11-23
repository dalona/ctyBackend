import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import Contact from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import User from '../users/entities/user.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAllContacts(userId: number): Promise<Contact[]> {
    return await this.contactRepository.find({where: {user: {id: userId}}});
  }

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    const user = await this.userRepository.findOne({ where: { id: createContactDto.user_id } });
    if (!user) {
      throw new Error('User not found');
    }
  
    const contact = this.contactRepository.create({
      ...createContactDto,
      user,
    });
  
    return await this.contactRepository.save(contact);
  }
  
  async updateContact(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new Error('Contact not found');
    }
  
    await this.contactRepository.update(id, updateContactDto);
  
    return await this.contactRepository.findOne({ where: { id } });
  }

  async deleteContact(id: number): Promise<void> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new Error('Contact not found');
    }
    await this.contactRepository.delete({ id });
    return;
  }
}