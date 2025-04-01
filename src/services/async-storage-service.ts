export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
  }
  
  function query<T>(entityType: string): Promise<T[]> {
    const data = localStorage.getItem(entityType)
    const entities: T[] = data ? JSON.parse(data) : []
    return Promise.resolve(entities)
  }
  
  function get<T>(entityType: string, entityId: string): Promise<T | undefined> {
    return query<T>(entityType).then((entities) =>
      entities.find((entity: any) => entity.id === entityId)
    )
  }
  
  function post<T extends { id?: string }>(entityType: string, newEntity: T): Promise<T> {
    newEntity.id = _makeId()
    return query<T>(entityType).then((entities) => {
      entities.unshift(newEntity)
      _save(entityType, entities)
      return newEntity
    })
  }
  
  function postMany<T>(entityType: string, newEntities: T[]): Promise<T[]> {
    return query<T>(entityType).then((entities) => {
      entities.push(...newEntities)
      _save(entityType, entities)
      return entities
    })
  }
  
  function put<T extends { id: string }>(entityType: string, updatedEntity: T): Promise<T> {
    return query<T>(entityType).then((entities) => {
      const idx = entities.findIndex((entity: any) => entity.id === updatedEntity.id)
      entities.splice(idx, 1, updatedEntity)
      _save(entityType, entities)
      return updatedEntity
    })
  }
  
  function remove(entityType: string, entityId: string): Promise<void> {
    return query(entityType).then((entities: any[]) => {
      const idx = entities.findIndex((entity) => entity.id === entityId)
      if (idx !== -1) {
        entities.splice(idx, 1)
        _save(entityType, entities)
      }
    })
  }
  
  function _save(entityType: string, entities: unknown[]): void {
    localStorage.setItem(entityType, JSON.stringify(entities))
  }
  
  function _makeId(length: number = 8): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let text = ''
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }