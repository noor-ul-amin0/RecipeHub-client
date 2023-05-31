export const Responses = {
  _200(data = {}) {
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  },
  _201(data) {
    return new Response(JSON.stringify(data), {
      status: 201,
    });
  },
  _400(data = {}) {
    return new Response(JSON.stringify(data), {
      status: 400,
    });
  },
  _404(data = {}) {
    return new Response(JSON.stringify(data), {
      status: 404,
    });
  },
  _500(data = {}) {
    return new Response(JSON.stringify(data), {
      status: 500,
    });
  },
};
