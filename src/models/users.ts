import { QueryDocumentSnapshot, SetOptions } from 'firebase/firestore';

export class User {
  constructor(
    readonly name: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}
}

export const userConverter = {
  toFirestore: (model: User, setOptions?: SetOptions) => {
    console.log('toFirestore: model -> ', model);
    console.log('toFirestore setOptions: ', setOptions);
    
    //if(setOptions?.merge) return model;

    return {
      name: model.name + ' + ',
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    //console.log('fromFirestore setOptions: ', setOptions);
    const data = snapshot.data();
    return new User(
      data.name + '*',
      data.createdAt.toDate(),
      data.updatedAt.toDate()
    );
  }
}