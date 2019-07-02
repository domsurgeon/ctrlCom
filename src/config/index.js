export const api = 'http://localhost:8080'
export const LS = fetch( `${ api }/getProducts/` ).then( response => false ).catch( error => true )