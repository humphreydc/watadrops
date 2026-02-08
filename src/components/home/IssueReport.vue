<script setup>
</script>

<template>
<div class="flex flex-col justify-center items-center">
    <div class="mx-auto flex flex-col justify-center items-center text-center gap-4 sm:gap-6 mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold" >Location-Based Monitoring</h1>
        <p class="max-w-5xl text-lg sm:text-xl font-medium">Admins can filter and review reports by campus location to quickly identify high-impact issues and maintain smooth campus operations.</p>
    </div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-[80%] max-w-7xl">
    
    <div class="flex-1 rounded-xl overflow-hidden bg-white shadow-sm">
        <div class="bg-blue-100 px-2 py-4 flex items-center gap-3 pl-4">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M16.0001 13.3848C16.0001 14.6088 15.526 15.7828 14.6821 16.6483C14.203 17.1397 13.6269 17.5091 13 17.7364M19 13.6923C19 7.11538 12 2 12 2C12 2 5 7.11538 5 13.6923C5 15.6304 5.7375 17.4893 7.05025 18.8598C8.36301 20.2302 10.1436 20.9994 12.0001 20.9994C13.8566 20.9994 15.637 20.2298 16.9497 18.8594C18.2625 17.4889 19 15.6304 19 13.6923Z" stroke="#2b7fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3 class="text-lg font-bold text-gray-800">Water Issues</h3>
        </div>
        <div class="p-6 space-y-6">
            <div>
            <p class="text-sm font-semibold mb-2">COMMON REPORTS</p>
            <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>No water supply</li>
                <li>Low pressure</li>
                <li>Leaks or overflow</li>
                <li>Continuous flow</li>
            </ul>
        </div>
      <div>
        <p class="text-sm font-semibold mb-2">ADMIN ACTION</p>
        <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Review details</li>
          <li>Check usage data</li>
          <li>Confirm affected areas</li>
          <li>Forward to maintenance</li>
          <li>Update status</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex-1 rounded-xl overflow-hidden bg-white shadow-sm">
    <div class="bg-amber-100 px-6 py-4 flex items-center gap-3 pl-4">
        <svg class="w-8 h-8" fill="none" stroke="#fe9a00" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      <h3 class="text-lg font-bold text-gray-800">Electricity Issues</h3>
    </div>
    <div class="p-6 space-y-6">
      <div>
        <p class="text-sm font-semibold mb-2">COMMON REPORTS</p>
        <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Lights or outlets not working</li>
          <li>Faulty air conditioning</li>
          <li>Power outages</li>
          <li>High usage alerts</li>
        </ul>
      </div>
      <div>
        <p class="text-sm font-semibold mb-2">ADMIN ACTION</p>
        <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Verify usage data</li>
          <li>Identify issue scope</li>
          <li>Notify facilities</li>
          <li>Monitor follow-up</li>
          <li>Resolve report</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex-1 rounded-xl overflow-hidden bg-white shadow-sm">
    <div class="bg-red-200 px-6 py-4 flex items-center gap-3">
        <svg class="w-8 h-8 fill-red-500" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-l</title><path d="M84,480H28a12,12,0,0,1-12-12V92A12,12,0,0,1,28,80H84A12,12,0,0,1,96,92V468A12,12,0,0,1,84,480Z"/><path d="M240,208V156a12,12,0,0,0-12-12H124a12,12,0,0,0-12,12v52Z"/><path d="M112,416v52a12,12,0,0,0,12,12H228a12,12,0,0,0,12-12V416Z"/><rect x="112" y="240" width="128" height="144"/><path d="M340,480H268a12,12,0,0,1-12-12V44a12,12,0,0,1,12-12h72a12,12,0,0,1,12,12V468A12,12,0,0,1,340,480Z"/><path d="M369,100.7l30,367.83a12,12,0,0,0,13.45,10.92l72.16-9a12,12,0,0,0,10.47-12.9L465,91.21a12,12,0,0,0-13.2-10.94l-72.13,7.51A12,12,0,0,0,369,100.7Z"/>
        </svg>
      <h3 class="text-lg font-bold text-gray-800">Supplies Issues</h3>
    </div>
    <div class="p-6 space-y-6">
      <div>
        <p class="text-sm font-semibold mb-2">COMMON REPORTS</p>
        <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Missing supplies</li>
          <li>Cafeteria shortage</li>
          <li>Broken items</li>
          <li>Fast depletion</li>
        </ul>
      </div>
      <div>
        <p class="text-sm font-semibold mb-2">ADMIN ACTION</p>
        <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Check inventory</li>
          <li>Validate urgency</li>
          <li>Approve restocking</li>
          <li>Update records</li>
          <li>Close report</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
</template>