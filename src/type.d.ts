interface Request {
  user: {
    id: number
    type: number // 1-超管 2-普管
    username: string
  }
}
