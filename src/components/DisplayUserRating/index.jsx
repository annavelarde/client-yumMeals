/** @format */

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Form, Card } from "react-bootstrap";
import { UserRecipeRating } from "../../services/recipeService";

function DisplayUserRatings({ recipes }) {
	const [userRating, setUserRating] = useState("");
	const [userComment, setUserComment] = useState(null);
	const [isLoading, setIsLoading] = useState();
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		UserRecipeRating(recipes._id)
			.then((response) => {
				console.log("RESPONSE DATA:", response.data);
				if (!response.success) {
					return setError("setError:", response.data);
				}
				if (!response.data.oneRating.length) {
					setUserRating(null);
					setUserComment("");
				} else {
					setUserRating(response.data.oneRating[0]?.rating);
					setUserComment(response.data.oneRating[0]?.comment);
				}
			})
			.catch((message) => {
				setError(message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [recipes._id]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		console.log(error);
		return <div>{error}</div>;
	}

	return (
		<div className="row-sm-3">
			<Form>
				<Form.Group>
					{[...Array(5)].map((star, i) => {
						const ratingValue = i + 1;

						return (
							<Form.Label>
								<input type="radio" readOnly name="userRating" value={userRating} />
								<FaStar className="star" color={ratingValue <= userRating ? "#ffc107" : "#e4e5e9"} size={20} />
							</Form.Label>
						);
					})}
					<Card.Text className="h3">{userComment}</Card.Text>
				</Form.Group>
			</Form>
		</div>
	);
}

export default DisplayUserRatings;
