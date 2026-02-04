<script setup>
</script>
<template>
    <section class="w-full flex flex-col justify-center">
        <!-- tinatamad na ako magcomment haha -->
        <div class="flex flex-col justify-center items-center py-32 lg:py-45 px-8 gap-6">
            <div class="mx-auto flex flex-col justify-center items-center text-center gap-4 sm:gap-6">
                <h1 class="text-4xl sm:text-5xl font-bold">Location-Based Monitoring</h1>
                <p class="max-w-5xl text-lg sm:text-xl font-medium">Admins can filter and review reports by campus location to quickly identify high-impact issues and maintain smooth campus operations.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mt-6 sm:mt-8">
                <div class="card-border py-6 flex flex-col gap-4">
                    <div class="flex items-center gap-4">
                        <div class="bg-green-100 p-2 rounded-xl">
                            <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M32 256C32 220.7 60.7 192 96 192L160 192L287.9 76.9C306.2 60.5 333.9 60.5 352.1 76.9L480 192L544 192C579.3 192 608 220.7 608 256L608 512C608 547.3 579.3 576 544 576L96 576C60.7 576 32 547.3 32 512L32 256zM256 440L256 528L384 528L384 440C384 417.9 366.1 400 344 400L296 400C273.9 400 256 417.9 256 440zM144 448C152.8 448 160 440.8 160 432L160 400C160 391.2 152.8 384 144 384L112 384C103.2 384 96 391.2 96 400L96 432C96 440.8 103.2 448 112 448L144 448zM160 304L160 272C160 263.2 152.8 256 144 256L112 256C103.2 256 96 263.2 96 272L96 304C96 312.8 103.2 320 112 320L144 320C152.8 320 160 312.8 160 304zM528 448C536.8 448 544 440.8 544 432L544 400C544 391.2 536.8 384 528 384L496 384C487.2 384 480 391.2 480 400L480 432C480 440.8 487.2 448 496 448L528 448zM544 304L544 272C544 263.2 536.8 256 528 256L496 256C487.2 256 480 263.2 480 272L480 304C480 312.8 487.2 320 496 320L528 320C536.8 320 544 312.8 544 304zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
                            </svg> 
                        </div>
                        <h2 class="font-bold text-2xl text-center">Classrooms</h2>
                    </div>
                    <ul class="list-disc p-4">
                        <li>Instructional tools and equipment</li>
                        <li>Lighting and power access</li>
                        <li>Water availability</li>
                    </ul>
                </div>
                <div class="card-border py-6 flex flex-col gap-4">
                    <div class="flex items-center gap-4">
                        <div class="bg-green-100 p-2 rounded-xl">
                            <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M384 64L224 64C206.3 64 192 78.3 192 96C192 113.7 206.3 128 224 128L224 279.5L103.5 490.3C98.6 499 96 508.7 96 518.7C96 550.4 121.6 576 153.3 576L486.7 576C518.3 576 544 550.4 544 518.7C544 508.7 541.4 498.9 536.5 490.3L416 279.5L416 128C433.7 128 448 113.7 448 96C448 78.3 433.7 64 416 64L384 64zM288 279.5L288 128L352 128L352 279.5C352 290.6 354.9 301.6 360.4 311.3L402 384L238 384L279.6 311.3C285.1 301.6 288 290.7 288 279.5z"/>
                            </svg>
                        </div>
                       <h2 class="font-bold text-2xl">Laboratories</h2> 
                    </div>
                    <ul class="list-disc p-4">
                        <li>Specialized lab equipment</li>
                        <li>Water safety systems</li>
                        <li>Power stability</li>
                    </ul>
                </div>
                <div class="card-border py-6 flex flex-col gap-4">
                    <div class="flex items-center gap-4">
                        <div class="bg-green-100 p-2 rounded-xl">
                            <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M380.8 96C372.7 110.1 368 126.5 368 144L368 160L96 160L96 384L368 384L368 448L96 448C60.7 448 32 419.3 32 384L32 160C32 124.7 60.7 96 96 96L380.8 96zM368 496C368 513.5 372.7 529.9 380.8 544L152 544C138.7 544 128 533.3 128 520C128 506.7 138.7 496 152 496L368 496zM464 96L560 96C586.5 96 608 117.5 608 144L608 496C608 522.5 586.5 544 560 544L464 544C437.5 544 416 522.5 416 496L416 144C416 117.5 437.5 96 464 96zM488 160C474.7 160 464 170.7 464 184C464 197.3 474.7 208 488 208L536 208C549.3 208 560 197.3 560 184C560 170.7 549.3 160 536 160L488 160zM488 256C474.7 256 464 266.7 464 280C464 293.3 474.7 304 488 304L536 304C549.3 304 560 293.3 560 280C560 266.7 549.3 256 536 256L488 256zM544 400C544 382.3 529.7 368 512 368C494.3 368 480 382.3 480 400C480 417.7 494.3 432 512 432C529.7 432 544 417.7 544 400z"/>
                            </svg>
                        </div>
                        <h2 class="font-bold text-2xl">Computer Laboratory</h2>
                    </div>
                    <ul class="list-disc p-4">
                        <li>Desktop and workstation power</li>
                        <li>Air conditioning units</li>
                        <li>Network and equipment stability</li>
                    </ul>
                </div>
                <div class="card-border py-6 flex flex-col gap-4">
                    <div class="flex items-center gap-4">
                        <div class="bg-green-100 p-2 rounded-xl">
                            <svg class="w-12 h-12" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                                <g fill-rule="evenodd">
                                    <path d="M61.821 11.045c.703-1.309-.891-.912-.891-.912s-10.627 10.201-12.104 8.951S59.231 8.057 57.825 6.23c-1.301-1.703-11.74 10.455-12.994 8.97c-1.242-1.482 8.939-12.123 8.939-12.123s.387-1.602-.912-.9C36.851 10.785 34.812 18.81 34.812 18.81s-.551 1.563.645 2.771c.117.105-29.204 29.26-33.129 33.196c-1.91 1.908 5.098 8.801 6.996 6.893c3.926-3.936 33.024-33.303 33.129-33.194c1.207 1.205 2.766.652 2.766.652s8.012-2.045 16.602-18.083" fill="#000000"></path>
                                    <path d="M32.028 40.507c7.803 7.82 20.958 20.999 20.958 20.999s5.742-1.879 6.551-6.729L38.662 33.861a5104.35 5104.35 0 0 0-6.634 6.646" fill="#000000"></path>
                                    <path d="M21.76 33.729a5059.26 5059.26 0 0 0 8.387-8.4L7.459 2.598s-.41-.43-1.313.477C4.353 4.862.884 16.248 15.591 30.977c2.331 2.336 4.359 2.66 6.169 2.752" fill="#000000"></path>
                                </g>
                            </svg>
                        </div>
                        <h2 class="font-bold text-2xl text-center">Cafeteria</h2>
                    </div>
                    <ul class="list-disc p-4">
                        <li>Water availability</li>
                        <li>Electricity for appliances</li>
                        <li>Supply stock levels</li>
                    </ul>
                </div> 
            </div>
        </div>
    </section>
</template>