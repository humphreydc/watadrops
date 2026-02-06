<script setup>
import { onMounted } from 'vue'

// ewan kong ano to
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.card-border').forEach((card, index) => {
    card.style.transitionDelay = `${index * 150}ms`
    observer.observe(card)
  })
})
</script>

<template>
    <section class="w-full flex flex-col justify-center" id="guide">
        <!-- tinatamad na ako magcomment haha -->
        <div class="flex flex-col justify-center items-center py-32 lg:py-45 px-8 gap-16">
            <div class="mx-auto flex flex-col justify-center items-center text-center gap-4 sm:gap-6">
                <h1 class="text-4xl sm:text-5xl font-bold">How Students Reports Work</h1>
                <p class="max-w-5xl text-lg sm:text-xl font-medium">Students can submit reports when they notice issues or unusual resource usage in classrooms, laboratories, or the cafeteria. Administrators review and act to these reports.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
                <div class="card-border py-16 flex flex-col gap-4 opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
                    <div class="flex flex-col gap-4">
                        <svg class="mx-auto w-25 h-25 fill-(--primary-color)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
                        </svg>
                        <h2 class="font-bold text-xl text-center">Location</h2>
                    </div>
                    <p class="text-center">Classroom, Laboratory, <br>and Cafeteria.</p>
                </div>
                <div class="card-border py-16 flex flex-col gap-4 opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
                    <div class="flex flex-col gap-4">
                        <div class="flex justify-center py-5">
                            <svg class="w-15 h-15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="Vector" d="M16.0001 13.3848C16.0001 14.6088 15.526 15.7828 14.6821 16.6483C14.203 17.1397 13.6269 17.5091 13 17.7364M19 13.6923C19 7.11538 12 2 12 2C12 2 5 7.11538 5 13.6923C5 15.6304 5.7375 17.4893 7.05025 18.8598C8.36301 20.2302 10.1436 20.9994 12.0001 20.9994C13.8566 20.9994 15.637 20.2298 16.9497 18.8594C18.2625 17.4889 19 15.6304 19 13.6923Z" stroke="#2b7fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg class="w-15 h-15" fill="none" stroke="#fe9a00" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <svg class="w-15 h-15 fill-red-500" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-l</title><path d="M84,480H28a12,12,0,0,1-12-12V92A12,12,0,0,1,28,80H84A12,12,0,0,1,96,92V468A12,12,0,0,1,84,480Z"/><path d="M240,208V156a12,12,0,0,0-12-12H124a12,12,0,0,0-12,12v52Z"/><path d="M112,416v52a12,12,0,0,0,12,12H228a12,12,0,0,0,12-12V416Z"/><rect x="112" y="240" width="128" height="144"/><path d="M340,480H268a12,12,0,0,1-12-12V44a12,12,0,0,1,12-12h72a12,12,0,0,1,12,12V468A12,12,0,0,1,340,480Z"/><path d="M369,100.7l30,367.83a12,12,0,0,0,13.45,10.92l72.16-9a12,12,0,0,0,10.47-12.9L465,91.21a12,12,0,0,0-13.2-10.94l-72.13,7.51A12,12,0,0,0,369,100.7Z"/>
                            </svg>
                        </div>
                       <h2 class="font-bold text-xl text-center">Resource Type</h2> 
                    </div>
                    <p class="text-center">Water, Electricity, or <br>Supplies.</p>
                </div>
                <div class="card-border py-16 flex flex-col gap-4 opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
                    <div class="flex flex-col gap-4">
                        <svg class="mx-auto w-25 h-25 fill-(--primary-color)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M525.2 82.9C536.7 88 544 99.4 544 112L544 528C544 540.6 536.7 552 525.2 557.1C513.7 562.2 500.4 560.3 490.9 552L444.3 511.3C400.7 473.2 345.6 451 287.9 448.3L287.9 544C287.9 561.7 273.6 576 255.9 576L223.9 576C206.2 576 191.9 561.7 191.9 544L191.9 448C121.3 448 64 390.7 64 320C64 249.3 121.3 192 192 192L276.5 192C338.3 191.8 397.9 169.3 444.4 128.7L491 88C500.4 79.7 513.9 77.8 525.3 82.9zM288 384L288 384.2C358.3 386.9 425.8 412.7 480 457.6L480 182.3C425.8 227.2 358.3 253 288 255.7L288 384z"/>
                        </svg>
                        <h2 class="font-bold text-xl text-center">Description of the Issue</h2>
                    </div>
                    <p class="text-center">Details of the <br>observed issue.</p>
                </div>
                <div class="card-border py-16 flex flex-col gap-4 opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
                    <div class="flex flex-col gap-4">
                        <svg class="mx-auto w-25 h-25 fill-(--primary-color)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M568.4 196.5C563.9 207 550 206.3 543.5 196.9C515.7 156.9 477.4 124.7 432.5 104.3C422.1 99.6 418.8 86 428.4 79.7C443.4 69.8 461.4 64 480.7 64C533.3 64 575.9 106.6 575.9 159.2C575.9 172.4 573.2 185 568.3 196.5zM96.5 196.9C90 206.3 76 207 71.6 196.5C66.7 185 64 172.4 64 159.2C64 106.6 106.6 64 159.2 64C178.5 64 196.5 69.8 211.5 79.7C221.1 86 217.8 99.6 207.4 104.3C162.6 124.7 124.3 156.9 96.4 196.9zM454.2 531.4C416.8 559.4 370.3 576 320 576C269.7 576 223.2 559.4 185.9 531.4L150.6 566.6C138.1 579.1 117.8 579.1 105.3 566.6C92.8 554.1 92.8 533.8 105.3 521.3L140.5 486.1C112.6 448.8 96 402.3 96 352C96 228.3 196.3 128 320 128C443.7 128 544 228.3 544 352C544 402.3 527.4 448.8 499.4 486.2L534.6 521.4C547.1 533.9 547.1 554.2 534.6 566.7C522.1 579.2 501.8 579.2 489.3 566.7L454.1 531.5zM344 248C344 234.7 333.3 224 320 224C306.7 224 296 234.7 296 248L296 352C296 358.4 298.5 364.5 303 369L359 425C368.4 434.4 383.6 434.4 392.9 425C402.2 415.6 402.3 400.4 392.9 391.1L343.9 342.1L343.9 248z"/>
                        </svg>
                        <h2 class="font-bold text-xl text-center">Time and Date Submitted</h2>
                    </div>
                    <p class="text-center">Timestamp of when <br>report was submitted.</p>
                </div> 
            </div>
            <div class="flex items-center bg-green-100 p-4 gap-4 max-w-312 w-full">
                <svg class="w-12 h-12 fill-(--primary-color)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M525.2 82.9C536.7 88 544 99.4 544 112L544 528C544 540.6 536.7 552 525.2 557.1C513.7 562.2 500.4 560.3 490.9 552L444.3 511.3C400.7 473.2 345.6 451 287.9 448.3L287.9 544C287.9 561.7 273.6 576 255.9 576L223.9 576C206.2 576 191.9 561.7 191.9 544L191.9 448C121.3 448 64 390.7 64 320C64 249.3 121.3 192 192 192L276.5 192C338.3 191.8 397.9 169.3 444.4 128.7L491 88C500.4 79.7 513.9 77.8 525.3 82.9zM288 384L288 384.2C358.3 386.9 425.8 412.7 480 457.6L480 182.3C425.8 227.2 358.3 253 288 255.7L288 384z"/>
                </svg>
                Admins are responsible for reviewing and acting on these reports promptly.
            </div>
        </div>
    </section>
</template>