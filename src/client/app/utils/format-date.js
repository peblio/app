import moment from 'moment';

export default function formatDate(dateString = '') {
  if (!dateString || dateString === '') {
    return '';
  }

  // format looks like: January 1, 2018
  return moment.utc(dateString).format('M/D/YYYY');
}
