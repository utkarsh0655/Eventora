const events = [
  {id:1,title:"The Sound of Somewhere",category:"Music",date:"2026-11-14",time:"6:30 PM",venue:"The Garden Stage, Bhubaneswar",price:"₹499 onwards",description:"An open-air evening of indie music, warm lights, and artists you’ll want to hear again. Bring your friends and let the city soundtrack your night.",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=85",featured:true},
  {id:2,title:"Future Forward Summit",category:"Technology",date:"2026-11-19",time:"10:00 AM",venue:"KIIT Convention Centre, Bhubaneswar",price:"₹799 onwards",description:"A full day of conversations about AI, design, startups, and the ideas shaping tomorrow. Meet builders, exchange perspectives, and leave with fresh inspiration.",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",featured:true},
  {id:3,title:"Canvas & Coffee",category:"Art & Culture",date:"2026-11-22",time:"11:00 AM",venue:"Studio 12, Bhubaneswar",price:"₹350 onwards",description:"A relaxed creative workshop for beginners and curious minds. Paint, sip coffee, and spend a slow afternoon making something that’s entirely yours.",image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85"},
  {id:4,title:"Sunday Slowdown",category:"Lifestyle",date:"2026-11-29",time:"8:00 AM",venue:"Ekamra Kanan, Bhubaneswar",price:"Free entry",description:"Start your Sunday with mindful movement, fresh air, and a little community. A welcoming morning for every fitness level—just bring a mat and good energy.",image:"https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1000&q=85"},
  {id:5,title:"The Makers Market",category:"Art & Culture",date:"2026-12-05",time:"4:00 PM",venue:"Cultural Yard, Bhubaneswar",price:"Free entry",description:"Meet local makers, find thoughtful handmade pieces, and discover the people behind them. Good finds, good food, and a very good way to spend an evening.",image:"https://images.unsplash.com/photo- bazaar?auto=format&fit=crop&w=1000&q=85".replace("photo- bazaar","photo-1470229722913-7c0e2dbbafd")},
  {id:6,title:"Digital Detox Club",category:"Lifestyle",date:"2026-12-12",time:"5:00 PM",venue:"The Courtyard Café, Bhubaneswar",price:"₹299 onwards",description:"Put your phone away and reconnect with the room. Expect board games, conversation prompts, and a few hours of being present with people, not screens.",image:"https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=85"}
];

const grid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const emptyState = document.getElementById("emptyState");
const eventCount = document.getElementById("eventCount");
const eventModal = document.getElementById("eventModal");
const registrationModal = document.getElementById("registrationModal");
let activeCategory = "All";
let selectedEventId = events[0].id;
let countdownInterval;

const dateParts = date => {
  const d = new Date(date + "T12:00:00");
  return {day: d.getDate(), month: d.toLocaleString("en-US",{month:"short"}).toUpperCase()};
};
const prettyDate = date => new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function renderEvents(){
  const query = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(e => (activeCategory==="All" || e.category===activeCategory) &&
    [e.title,e.category,e.venue,e.description].some(v=>v.toLowerCase().includes(query)));
  grid.innerHTML = filtered.map(e=>{
    const d=dateParts(e.date);
    return `<article class="event-card" tabindex="0" role="button" aria-label="View details for ${escapeHTML(e.title)}" data-id="${e.id}">
      <div class="event-image" style="background-image:url('${e.image}')"><span class="event-tag">${escapeHTML(e.category.toUpperCase())}${e.featured?" · FEATURED":""}</span><span class="event-date-badge"><strong>${d.day}</strong><small>${d.month}</small></span></div>
      <div class="event-card-body"><div class="event-meta"><span>◷ ${prettyDate(e.date)} · ${e.time}</span></div><h3>${escapeHTML(e.title)}</h3><p>${escapeHTML(e.description)}</p><div class="event-card-footer"><span>${escapeHTML(e.price)}</span><span>↗</span></div></div>
    </article>`;
  }).join("");
  emptyState.classList.toggle("hidden",filtered.length>0);
  eventCount.textContent=`Showing ${filtered.length} event${filtered.length===1?"":"s"}`;
  document.getElementById("allCount").textContent=String(events.length).padStart(2,"0");
}
function setCategory(category){
  activeCategory=category;
  document.querySelectorAll(".filter-chip").forEach(btn=>btn.classList.toggle("active",btn.dataset.category===category));
  renderEvents();
}
function showEvent(id){
  const e=events.find(item=>item.id===Number(id)); if(!e)return;
  selectedEventId=e.id;
  document.getElementById("modalImage").style.backgroundImage=`url('${e.image}')`;
  document.getElementById("modalCategory").textContent=e.category.toUpperCase()+" · EVENT DETAILS";
  document.getElementById("modalTitle").textContent=e.title;
  document.getElementById("modalMeta").innerHTML=`<span>◷ ${prettyDate(e.date)} · ${e.time}</span><span>⌖ ${escapeHTML(e.venue)}</span><span>${escapeHTML(e.price)}</span>`;
  document.getElementById("modalDescription").textContent=e.description;
  eventModal.classList.remove("hidden");
  startCountdown(e.date);
}
function startCountdown(date){
  clearInterval(countdownInterval);
  const target=new Date(date+"T18:00:00").getTime();
  function update(){
    const diff=target-Date.now();
    if(diff<=0){document.getElementById("countdown").innerHTML='<span class="countdown-label">EVENT DAY IS HERE!</span>';clearInterval(countdownInterval);return;}
    document.getElementById("days").textContent=String(Math.floor(diff/86400000)).padStart(2,"0");
    document.getElementById("hours").textContent=String(Math.floor(diff%86400000/3600000)).padStart(2,"0");
    document.getElementById("minutes").textContent=String(Math.floor(diff%3600000/60000)).padStart(2,"0");
  }
  update();countdownInterval=setInterval(update,60000);
}
function openRegistration(){
  const e=events.find(item=>item.id===selectedEventId);
  const select=document.getElementById("selectedEvent");
  select.innerHTML=events.map(item=>`<option value="${item.id}" ${item.id===selectedEventId?"selected":""}>${escapeHTML(item.title)} — ${prettyDate(item.date)}</option>`).join("");
  eventModal.classList.add("hidden");registrationModal.classList.remove("hidden");
  document.getElementById("formError").textContent="";
}
function closeModals(){eventModal.classList.add("hidden");registrationModal.classList.add("hidden");clearInterval(countdownInterval);}
function showToast(message){const toast=document.getElementById("toast");toast.textContent=message;toast.classList.remove("hidden");setTimeout(()=>toast.classList.add("hidden"),3500);}

grid.addEventListener("click",e=>{const card=e.target.closest(".event-card");if(card)showEvent(card.dataset.id);});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("event-card")){e.preventDefault();showEvent(e.target.dataset.id);}});
categoryFilters.addEventListener("click",e=>{const btn=e.target.closest(".filter-chip");if(btn)setCategory(btn.dataset.category);});
searchInput.addEventListener("input",renderEvents);
document.getElementById("resetFilters").addEventListener("click",()=>{searchInput.value="";setCategory("All");});
document.getElementById("modalRegister").addEventListener("click",openRegistration);
document.getElementById("closeModal").addEventListener("click",closeModals);
document.getElementById("closeRegistration").addEventListener("click",closeModals);
[eventModal,registrationModal].forEach(modal=>modal.addEventListener("click",e=>{if(e.target===modal)closeModals();}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModals();});

document.getElementById("registrationForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("fullName").value.trim();
  const email=document.getElementById("regEmail").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const eventId=Number(document.getElementById("selectedEvent").value);
  const error=document.getElementById("formError");
  if(name.length<2){error.textContent="Please enter your full name (at least 2 characters).";return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){error.textContent="Please enter a valid email address.";return;}
  if(!/^[6-9]\d{9}$/.test(phone)){error.textContent="Enter a valid 10-digit Indian mobile number.";return;}
  const selected=events.find(ev=>ev.id===eventId);
  if(!selected){error.textContent="Please select a valid event.";return;}
  const registration={id:Date.now(),name,email,phone,eventId,eventName:selected.title,registeredAt:new Date().toISOString()};
  const saved=JSON.parse(localStorage.getItem("eventoraRegistrations")||"[]");
  saved.push(registration);localStorage.setItem("eventoraRegistrations",JSON.stringify(saved));
  e.target.reset();closeModals();showToast(`You're registered for ${selected.title}! Check your details in this browser's Local Storage.`);
});
document.getElementById("themeToggle").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  const dark=document.body.classList.contains("dark");
  localStorage.setItem("eventoraTheme",dark?"dark":"light");
  document.getElementById("themeToggle").textContent=dark?"☀":"☾";
});
if(localStorage.getItem("eventoraTheme")==="dark"){document.body.classList.add("dark");document.getElementById("themeToggle").textContent="☀";}
document.getElementById("newsletterForm").addEventListener("submit",e=>{
  e.preventDefault();const email=document.getElementById("newsletterEmail").value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){document.getElementById("newsletterMessage").textContent="Please enter a valid email.";return;}
  document.getElementById("newsletterMessage").textContent="You're on the list! (Demo only — no email was sent.)";e.target.reset();
});
document.getElementById("menuToggle").addEventListener("click",()=>document.querySelector(".nav-links").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav-links").classList.remove("open")));

renderEvents();
