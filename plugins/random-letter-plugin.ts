export const randomLetterPlugin = () => {
	const letters = [
		"我猜你就会点开控制台",
		"你找我有什么事吗？",
		"看到我了？我猜你又出bUg了",
	];

	const print = () => {
		const randIndex = Math.floor(Math.random() * letters.length);
		const randLetter = letters[randIndex];
		console.log(`zhangkun${randLetter}`);
	};
	/* 
		configureServer方法在服务器启动时被立即执行，它会调用print函数打印一个随机字符。
		transform方法用于在打包过程中对代码进行转换。在这个方法中，首先判断当前文件的路径是否以main.ts结尾，
		如果是，则在入口文件的末尾添加了一个打印随机字符的代码块。
	*/
	return {
		name: "random-letter-plugin",
		configureServer() {
			//在服务器启动时立即执行
			print();
		},
		// code 是要转换的代码内容，id 是当前文件的路径。
		transform(code: any, id: string) {
			if (id.endsWith("main.ts")) {
				// 在入口文件中添加随机字符的打印代码
				return `${code}\nif (typeof window !== 'undefined') {
				const letters = ['我猜你就会点开控制台', '你找我有什么事吗？', '看到我了？我猜你又出bug了'];
				const printRandomLetter = () => {
				  const randomIndex = Math.floor(Math.random() * letters.length);
				  const randomLetter = letters[randomIndex];
				  return randomLetter;
				};
				console.log(
					'%c' + "zhangkun" + printRandomLetter(),
					'color: #1e80ff; font-size: 20px; background: #fff; padding: 8px;'
					);
				
			  }`;
			}
			return code;
		},
	};
};
