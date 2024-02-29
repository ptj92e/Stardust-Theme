import axios from 'axios';

let newsletters;
let boardMinutes;
let audits;
let meetingPDF;

let rules;
let calendar;

const PDFService = {
    getOwnersPDFs: async function() {
        const newslettersUrl = `/wp-json/wp/v2/newsletters?per_page=50`;
        await axios.get(newslettersUrl).then((response) => {
            newsletters = response.data;
        });

        const boardMinutesUrl = `/wp-json/wp/v2/board_minutes?per_page=50`;
        await axios.get(boardMinutesUrl).then((response) => {
            boardMinutes = response.data;
        });

        const auditsUrl = `/wp-json/wp/v2/audits?per_page=50`;
        await axios.get(auditsUrl).then((response) => {
            audits = response.data;
        });

        const meetingPDFUrl = `/wp-json/wp/v2/meeting_pdfs`;
        await axios.get(meetingPDFUrl).then((response) => {
            meetingPDF = response.data;
        });

        return {
            newsletters,
            boardMinutes,
            audits,
            meetingPDF
        };
    },

    getReservationPDFs: async function() {
        const rulesUrl = `/wp-json/wp/v2/rules`;
        await axios.get(rulesUrl).then((response) => {
            rules = response.data;
        });

        const calendarUrl = `/wp-json/wp/v2/usage_calendars`;
        await axios.get(calendarUrl).then((response) => {
            calendar = response.data;
        });

        return {
            rules,
            calendar
        }
    }
};

export default PDFService;
