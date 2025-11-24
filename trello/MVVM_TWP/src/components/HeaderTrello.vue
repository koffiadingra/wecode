<template>
    <router-link to="/">
        <header class="flex items-center justify-between bg-[#00000050] text-black p-2">
            <div class="flex items-center justify-center gap-2">
                <h1 class=" font-bold text-white text-xl">My Trello board</h1>
                <div class="flex items-center justify-center gap-2">
                    <img class="w-8 h-7" src="../assets/images/trello(1).png" alt="">
                    <img style="filter: invert();" class="w-6 h-6" src="../assets/images/down-arrow.png" alt="">
                </div>
            </div>
            <div class="flex items-center justify-center gap-2">
                <img class="w-6 h-10" src="../assets/images/sort.png" alt="">
                <img class="w-8 h-8" src="../assets/images/more.png" alt="">
            </div>
        </header>
    </router-link>
</template>