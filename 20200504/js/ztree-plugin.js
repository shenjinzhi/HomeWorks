~function ($) {
	function zTree(data) {
		// this 指代调用的实例；
		let level = 0;
		// 数据绑定
		let bindHTML = function bindHTML(data) {
			level++;
			let str = ``;
			data.forEach(item => {
				let {
					name,
					children,
					open
				} = item;

				str += `<li>
				<a href="javascript:;" class="title">${name}</a>
				${
					children && children.length > 0 ? `<em class="icon ${open ? 'open' : ''}"></em>
					<ul class="level level${level}" style="display: ${open ? 'block' : 'none'};">
						${bindHTML(children)}
					</ul>`: ``
					}
				</li>`
			})
			level--;
			return str;
		};
		let HTML = bindHTML(data);
		//console.log(this);
		this.html(HTML);

		// 基于事件委托
		this.click(function (ev) {
			let target = ev.target,
				$target = $(target);

			if (target.tagName === 'EM') {
				let $next = $target.next('ul');
				$target.toggleClass('open');
				$next.stop().slideToggle(300);
			}
		})
	}

	// 供JQ实例调用
	$.fn.zTree = zTree;
}(jQuery);
