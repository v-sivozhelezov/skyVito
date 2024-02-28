/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

function changeDate(dateTime) {
    if (dateTime) {
        return format(dateTime, 'd MMMM yyyy', { locale: ru });
    }
}

export default changeDate;
