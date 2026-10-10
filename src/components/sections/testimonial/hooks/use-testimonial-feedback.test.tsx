import { act, renderHook } from "@testing-library/react";
import type { FormEvent } from "react";
import "../../../../i18n";
import { useTestimonialFeedback } from "./use-testimonial-feedback";

const buildEvent = () => {
  const form = document.createElement("form");
  const message = document.createElement("textarea");
  message.name = "message";
  message.value = "Hello";
  form.appendChild(message);
  return {
    preventDefault: jest.fn(),
    currentTarget: form,
  } as unknown as FormEvent<HTMLFormElement>;
};

describe("useTestimonialFeedback.handleSubmit", () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("posts urlencoded form data and reports success only on an ok response", async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, status: 200 });
    global.fetch = fetchMock as unknown as typeof fetch;
    const { result } = renderHook(() => useTestimonialFeedback());

    act(() => result.current.openFeedbackForm());
    await act(async () => {
      await result.current.handleSubmit(buildEvent());
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("message=Hello"),
      }),
    );
    expect(result.current.toast).toMatchObject({ show: true, type: "success" });
    expect(result.current.submitError).toBeNull();
    expect(result.current.showFeedbackForm).toBe(false);
  });

  it("keeps the form open and shows an error when the endpoint rejects", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: false, status: 500 }) as unknown as typeof fetch;
    const { result } = renderHook(() => useTestimonialFeedback());

    act(() => result.current.openFeedbackForm());
    await act(async () => {
      await result.current.handleSubmit(buildEvent());
    });

    expect(result.current.submitError).toEqual(expect.any(String));
    expect(result.current.toast.show).toBe(false);
    expect(result.current.showFeedbackForm).toBe(true);
    expect(result.current.isSubmitting).toBe(false);
  });

  it("shows an error when the network request throws", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("offline")) as unknown as typeof fetch;
    const { result } = renderHook(() => useTestimonialFeedback());

    await act(async () => {
      await result.current.handleSubmit(buildEvent());
    });

    expect(result.current.submitError).toEqual(expect.any(String));
  });
});
