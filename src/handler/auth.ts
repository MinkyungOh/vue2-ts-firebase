import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default class AuthHandler {
  private static inst: AuthHandler;

  constructor() {
    this.run();
  }
  public run() {
    onAuthStateChanged(getAuth(), (user) => {
      if(user) console.log('new user', user);
      console.log(user);
      
    });
  }
  public static instance() {
    if(!this.inst) this.inst = new AuthHandler();
    return this.inst;
  }
}