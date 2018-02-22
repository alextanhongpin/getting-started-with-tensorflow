class Counter {
  constructor () {
    this.events = {}
  }

  register (name, fn, threshold = 100) {
    if (!this.exist(name)) {
      this.events[name] = {
        counter: 0,
        hits: 1,
        fn,
        threshold,
        name
      }
      console.log(`event=${name} registered=true`)
    } else {
      console.log(`Event ${name} has already been initialized`)
    }
  }

  unregister (name) {
    delete this.events[name]
  }

  exist (name) {
    return this.events[name] !== undefined
  }

  increment (name) {
    if (!this.exist(name)) {
      console.log('')
    } else {
      this.events[name].counter += 1
      const { counter, hits, threshold, fn } = this.events[name]
      console.log(counter, threshold * hits)
      if (counter === threshold * hits) {
        this.events[name].hits += 1
        fn && fn(this.events[name])
      }
    }
  }

  info (name) {
    return this.events[name]
  }

  infos () {
    return Object.values(this.events)
  }

  reset (name) {
    this.event[name] = 0
  }
}

const counter = new Counter()
counter.register('send_email', (event) => {
  // console.log('got event', event)
  console.log('Error:', event.name, 'counter=', event.counter)
}, 5)

counter.register('send_to_queue', (event) => {
  console.log(`Error: ${event.name}, count: ${event.counter}`)
}, 20)

Array(100).fill(0).forEach(() => {
  counter.increment('send_email')
  counter.increment('send_to_queue')
})

console.log(counter.infos())
