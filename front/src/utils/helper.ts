// 随机字符串
export function randomCode(num = 4) {
    const CODE = 'qwertyuipasdfghjklxcvbnm13456789'
    let data = ''
  
    for (let i = 0; i < num; i++) {
      const random = Math.floor(Math.random() * CODE.length)
      data += CODE[random]
    }
  
    return data
  }