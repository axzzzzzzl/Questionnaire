
const wrapper = (handler) => async (req, res) => {
  try {
    const response = await handler?.(req, res)
    const result = {
      code: 200,
      data: response ?? {},
      msg: '操作成功',
    }
    res.send(result)
  } catch (error) {
    const errorResult = {
      code: 500,
      msg: error.message,
    }
    res.send(errorResult)
  }
}

module.exports = wrapper