import { format } from 'date-fns'; // Treeshakeable
// import * as dateFns from 'date-fns'; // Non-Treeshakeable

const message = format(new Date(), '\'Today is\' eeee');
// const message = dateFns.format(new Date(), '\'Today is\' eeee');

console.log(message);
