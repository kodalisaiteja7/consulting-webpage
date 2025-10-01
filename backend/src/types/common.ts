export type PaginationQuery = {
	page?: number;
	limit?: number;
};

export type ApiResponse<T> = {
	success: boolean;
	message?: string;
	data?: T;
	meta?: Record<string, unknown>;
};
