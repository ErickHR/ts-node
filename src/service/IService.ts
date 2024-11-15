
export default interface IService {

  create(data: any): Promise<any>
  index(): Promise<any>
  getOne(id: string): Promise<any>
  update(id: string, data: any): Promise<any>
  delete(id: string): Promise<any>
}
