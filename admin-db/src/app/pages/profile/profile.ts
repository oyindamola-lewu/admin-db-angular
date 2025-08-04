import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class Profile {
  user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'assets/images/avatar.jpg',
    bio: 'Frontend Developer | Traveler | Coffee Enthusiast',
    location: 'Lagos, Nigeria'
  };
}