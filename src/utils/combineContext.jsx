// inSide this Function we comine multiple context providers like helper function
// ... in the (rest opretor) we can pass multiple context providers
export default function combineContext(...providers) {
  /**
   * this combine multiple context providers together and returns a single context provider
   */
  return ({ children }) => {
      return providers.reduceRight((accumulator, Currentprovider) => {
          return <Currentprovider>{accumulator}</Currentprovider>
      }, children /** it is Initial value */);
  };
}



/** Problem
 * <A>
 *     <B>
 *         <C>
 *             <D>
 *                {children}
 *             </D>
 *         </C>
 *     </B>
 * </A>
 */

/**
 * Solution
 *
 *   <Combine>
 *
 *         {children}
 *
 *   </Combine>
 */
