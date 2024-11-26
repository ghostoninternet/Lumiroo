const playgroundDaos = require('../daos/playground.daos')

const getPlayground = async(limit, page) => {
  const totalPlaygrounds = await playgroundDaos.countTotalPlaygrounds({})
  const playgrounds = await playgroundDaos.getPlaygrounds({}, limit, page)
  const totalPage = Math.ceil(totalPlaygrounds / limit)

  return {
    data: playgrounds,
    pagination: {
      totalPage: totalPage,
      limitPerPage: limit,
      currentPage: page,
    },
  }
}

const filterPlayground = async (filterParams) => {
  // area, attractions, openingTime, closingTime, minAdmissionFee, maxAdmissionFee, limit, page
  const { area, attractions, openingTime, closingTime, minAdmissionFee, maxAdmissionFee, limit, page } = filterParams
  let condition = {}

  if (area) {
    condition = {
      area: area,
    }
  }

  if (attractions) {
    condition = {
      ...condition,
      attractions: { $in: attractions },
    }
  }

  if (openingTime) {
    condition = {
      ...condition,
      openingTime: { $gte: openingTime },
    }
  }

  if (closingTime) {
    condition = {
      ...condition,
      closingTime: { $lte: closingTime },
    }
  }

  condition = {
    ...condition,
    admissionFee: { $gte: minAdmissionFee, $lte: maxAdmissionFee },
  }

  const totalPlaygrounds = await playgroundDaos.countTotalPlaygrounds(condition)
  const playgrounds = await playgroundDaos.getPlaygrounds(condition, limit, page)

  const totalPage = Math.ceil(totalPlaygrounds / limit)

  return {
    data: playgrounds,
    pagination: {
      totalPage: totalPage,
      limitPerPage: limit,
      currentPage: page,
    },
  }
}

module.exports = {
  getPlayground,
  filterPlayground,
}
