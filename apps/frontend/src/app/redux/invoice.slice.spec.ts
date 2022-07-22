import { fetchInvoice, invoiceAdapter, invoiceReducer } from './invoice.slice';

describe('invoice reducer', () => {
  it('should handle initial state', () => {
    const expected = invoiceAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(invoiceReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchInvoices', () => {
    let state = invoiceReducer(undefined, fetchInvoice.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = invoiceReducer(
      state,
      fetchInvoice.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = invoiceReducer(
      state,
      fetchInvoice.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
