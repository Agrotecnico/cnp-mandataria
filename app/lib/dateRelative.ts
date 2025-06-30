import {formatDistanceToNowStrict} from "date-fns/formatDistanceToNowStrict";
import {es} from 'date-fns/locale/es';

const locale= es
export default function distanceToNow(dateTime: number | Date) {
  return formatDistanceToNowStrict(dateTime, {
    addSuffix: true,
    locale
  });
}
