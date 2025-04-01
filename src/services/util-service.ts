export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
  }
  
  function saveToStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

//   function saveToStorage<T>(key: string, value: T | null): void {
//     if (value === null) {
//       localStorage.removeItem(key)
//     } else {
//       localStorage.setItem(key, JSON.stringify(value))
//     }
//   }
  
  function loadFromStorage<T>(key: string): T | undefined {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
  }
  
  function makeId(length: number = 8): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let txt = ''
    for (let i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }