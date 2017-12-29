<template>
	<div class="hide">
		<div class="black"></div>
		<div class="hide_main">
			<ul class="hide_top">
				<li class="cancel">取消</li>
				<li>高级筛选</li>
				<li class="ensure">确定</li>
			</ul>
			<div class="content_main">
				<ul class="hide_main_one">
					<li>
						<input type="radio" value="" />
						<span>只看有票</span>
					</li>
					<li>
						<input type="radio" value="" />
						<span>只看直达</span>
					</li>
				</ul>
				<div class="hide_main_tow">
					<span class="top_span">车次类型</span>
					<ul>
						<li>
							<input type="radio" value="" />
							<span>高铁(G/C)</span>
						</li>
						<li>
							<input type="radio" value="" />
							<span>普通(Z/K/T)</span>
						</li>
					</ul>
					<ul>
						<li>
							<input type="radio" value="" />
							<span>动车(D)</span>
						</li>
						<li>
							<input type="radio" value="" />
							<span>其他(L/Y等)</span>
						</li>
					</ul>
				</div>
					<div class="hide_main_tow">
						<span class="top_span">出发时间</span>
					<ul>
						<li>
							<input type="radio" value="" />
							<span>0点到6点</span>
						</li>
						<li>
							<input type="radio" value="" />
							<span>12点到18点</span>
						</li>
					</ul>
					<ul>
						<li>
							<input type="radio" value="" />
							<span>6点到12点</span>
						</li>
						<li>
							<input type="radio" value="" />
							<span>18点到24点</span>
						</li>
					</ul>
				</div>
				<ul class="hide_main_one">
					<span class="top_span2">出发/到达站</span>
					<li>
						<input type="radio" value="" />
						<span>广州</span>
					</li>
					<li>
						<input type="radio" value="" />
						<span>海口</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{

	}
</script>