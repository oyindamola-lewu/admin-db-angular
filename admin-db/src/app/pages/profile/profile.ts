import { Component, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [FormsModule]
})
export class Profile implements DoCheck {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate seller with 5+ years of experience in electronics and gadgets.',
    businessName: 'TechGear Solutions',
    businessType: 'LLC',
    taxId: '12-3456789',
    businessAddress: '123 Commerce St',
    city: 'New York',
    state: 'New York',
    zipCode: '10001',
    bankAccount: '****1234',
    bank: 'Verified',
    accountType: 'Checking',
    payoutSchedule: 'Weekly'
  };

profileOriginal: string;
businessOriginal: string;
bankingOriginal: string;

isProfileUnchanged = true;
isBusinessUnchanged = true;
isBankingUnchanged = true;

constructor() {
  const savedUser = localStorage.getItem('userProfile');
  if (savedUser) {
    this.user = JSON.parse(savedUser);
  }

  // Store separate originals for each section
  this.profileOriginal = JSON.stringify(this.getProfileData());
  this.businessOriginal = JSON.stringify(this.getBusinessData());
  this.bankingOriginal = JSON.stringify(this.getBankingData());
}

ngDoCheck() {
  this.isProfileUnchanged =
    JSON.stringify(this.getProfileData()) === this.profileOriginal;

  this.isBusinessUnchanged =
    JSON.stringify(this.getBusinessData()) === this.businessOriginal;

  this.isBankingUnchanged =
    JSON.stringify(this.getBankingData()) === this.bankingOriginal;
}

getProfileData() {
  return {
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email,
    phone: this.user.phone,
    bio: this.user.bio,
  };
}

getBusinessData() {
  return {
    businessName: this.user.businessName,
    businessType: this.user.businessType,
    taxId: this.user.taxId,
    businessAddress: this.user.businessAddress,
    city: this.user.city,
    state: this.user.state,
    zipCode: this.user.zipCode,
  };
}

getBankingData() {
  return {
    bankAccount: this.user.bankAccount,
    bank: this.user.bank,
    accountType: this.user.accountType,
    payoutSchedule: this.user.payoutSchedule,
  };
}

saveProfile() {
  this.profileOriginal = JSON.stringify(this.getProfileData());
  this.saveAll();
}

saveBusiness() {
  this.businessOriginal = JSON.stringify(this.getBusinessData());
  this.saveAll();
}

saveBanking() {
  this.bankingOriginal = JSON.stringify(this.getBankingData());
  this.saveAll();
}

private saveAll() {
  localStorage.setItem('userProfile', JSON.stringify(this.user));
}
}