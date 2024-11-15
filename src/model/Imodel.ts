export default interface IModel<T> {

  index(): Promise<any>
  findById ( id: string ): Promise<any>
  save(data: T): Promise<any>
  delete ( id: string ): Promise<any>
  update ( id: string, data: T ): Promise<any>
}

// dame el simbolo de menor que
