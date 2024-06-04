import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  admins: any[] = [
    {
      id: 1,
      name: 'Victor Misyutin',
      username: 'vmisyu',
      password: 'zoobeezoo'
    },
    {
      id: 2,
      name: 'Jude Stephenson',
      username: 'jsteph',
      password: 'tempPass'
    }
  ];  


  session: any;

  adminLogin(username: string, password:string){
    let admin = this.admins.find(
      (u) => u.username === username && u.password === password
    );
    if(admin){
      this.session = admin;
      localStorage.setItem('session', JSON.stringify(this.session));
    }

    return admin;
  }

}
