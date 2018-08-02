import { gql } from 'apollo-server-express';
import models from '../models';

export default async () => {
	const feelings = ['depressed', 'optimistic', 'bored', 'happy'];
	const length = await models.Feeling.count();

	const fillTable = () =>
		feelings.forEach(async name => {
			await models.Feeling.create({ name });
		});

	if (length === 0) await fillTable();
};
