import { publish } from 'gh-pages';

publish(
	'build',
	{
		branch: 'gh-pages',
		repo: 'https://github.com/marco-kretz/marco-kretz.github.io.git',
		user: {
			name: 'Marco Kretz',
			email: 'mk@marco-kretz.de'
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);
