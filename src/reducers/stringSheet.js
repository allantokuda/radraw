export default (str) => { return str.split(';').map(row => row.split(',').map(val => ({ value: val }))) }

