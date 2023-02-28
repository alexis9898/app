export class Category{
  constructor(
    public _id: string,
    public name: string,
    public parentId: string,
    public children: Category[],

  ){}
}
