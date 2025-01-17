import User from '../models/User.js';

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		res.status(200).json(user);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};

export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		const formattedFriends = friends.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				location,
				picturePath,
			}) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					location,
					picturePath,
				};
			}
		);

		res.status(200).json(formattedFriends);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};

export const addRemoveFriends = async (req, res) => {
	try {
		const { id, friendId } = req.params;

		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter(
				(friendID) => friendID !== id
			);
		} else {
			// TODO: Crear una funcion para que el amigo tenga que aceptar para que salga como amigo.
			user.friends.push(friendId);
			friend.friends.push(id);
		}

		await user.save();
		await friend.save();

		const friends = await Promise.all(
			user.friends.map((friendId) => User.findById(friendId))
		);
		const formattedFriends = friends.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				location,
				picturePath,
			}) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					location,
					picturePath,
				};
			}
		);

		res.status(200).json(formattedFriends);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};
