
export class Scroll {
  static scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  static scrollToRef(ref) {
    if (ref.current) {
      window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' })
    }
  }
}
