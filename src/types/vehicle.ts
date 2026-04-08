export type Vehicle = {
	id: number;
	title: string;
	brand: string;
	price: number;
	rating: number;
	description: string;

	thumbnail: string;
	images: string[];

	availabilityStatus: string;
	stock: number;

	warrantyInformation: string;
	shippingInformation: string;

	weight: number;
	dimensions: {
		width: number;
		height: number;
		depth: number;
	};

	reviews: Review[];
};

export type VehiclesResponse = {
	products: Vehicle[];
};

export type Review = {
	comment: string;
	reviewerName: string;
};
export type Comment = {
	text: string;
	author: string;
};
