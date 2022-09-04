<template>
<div>
	<div>
		<el-menu style="min-height:100%" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1" :class="[activeIndex===1?'active':'','linkIndex']">
				<span class="g-span">存款</span>
			</el-menu-item>
			<el-menu-item index="2" :class="[activeIndex===2?'active':'','linkIndex']">
				<span class="g-span">借贷</span>
			</el-menu-item>
		</el-menu>
	</div>
</div>
 
</template>

<script setup >
</script>
