export default function getObject() {
  return {
    id: 0,
    name: '',
    content: '',
    title: '',
    desc: '',
    tags: [],
    category: {
      id: null,
      title: null
    },
    price: {
      id: 0,
      value: 0,
      min: 0,
      max: 0,
      average: 0,
      unit: 0,
      rules: []
    },
    images: [],
    categorys: []
  }
}