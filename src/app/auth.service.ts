import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: any[] = [
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

  login(username: string, password:string){
    let user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if(user){
      this.session = user;
      localStorage.setItem('session', JSON.stringify(this.session));
    }

    return user;
  }

}
