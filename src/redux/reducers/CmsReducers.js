import { LOADING, GET_HOME_PAGE_DETAIL_SUCCESS, GET_HOME_PAGE_DETAIL_ERROR, GET_CMS_DETAIL_SUCCESS, GET_CMS_DETAIL_ERROR, GET_FAQ_DETAIL_SUCCESS, GET_FAQ_DETAIL_ERROR, GET_FOOTER_DETAIL_SUCCESS, GET_FOOTER_DETAIL_ERROR } from '../actions/types';
const initialState = {
	data: {},
	loading: false,
	error: {},
	home_page_detail: {},
	cms_page_detail: {},
	faq_page_detail: {},
	footer_page_detail: {},
};

export default function CmsReducers(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true
			};
		case GET_HOME_PAGE_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				home_page_detail: action.payload,
				error: {}
			};
		case GET_HOME_PAGE_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				home_page_detail: {},
				error: action.payload,
			};
		case GET_CMS_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				cms_page_detail: action.payload,
				error: {}
			};
		case GET_CMS_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				cms_page_detail: {},
				error: action.payload,
			};
		case GET_FAQ_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				faq_page_detail: action.payload,
				error: {}
			};
		case GET_FAQ_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				faq_page_detail: {},
				error: action.payload,
			};
		case GET_FOOTER_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				footer_page_detail: action.payload,
				error: {}
			};
		case GET_FOOTER_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				footer_page_detail: {},
				error: action.payload,
			};
		default:
			return state;
	}
}