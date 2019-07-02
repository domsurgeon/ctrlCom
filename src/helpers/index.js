export const miliToSt = mili => {
  let dt = new Date(mili)
  let m = (dt.getMonth()+1).toString()
  m = (m.length === 1 ? '0' : '') + m
  let d = dt.getDate().toString()
  d = (d.length === 1 ? '0' : '') + d
  const y = dt.getFullYear()

  return `${ y }-${ m }-${ d }`
}

export const valToDate = ( value, lim ) => {
  const date = {}
  let spvalue = value.split('-')

  if( lim === 'end' )
   spvalue = spvalue.concat(['23:59:59'])
  
  date[ lim ] = new Date( spvalue ) * 1

  return date
}

export const percent = ( val, total ) => Math.floor( 100 * val / total )

export const catsFromProds = products => {
  const categories = products
    .reduce( ( cats, product ) => {
      const cat = { name: product.category, spent: 0 }
      if( !cats.find( cate => cate.name === cat.name ) ){
        const filtered = products.filter( prod => prod.category === cat.name )
        cat.spent = filtered.reduce(( sum, prod ) => sum + prod.price ,0)
        cat.subitems = filtered
        cats.push( cat )
      }
      return cats
    },[] )

    return categories
}
