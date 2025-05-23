import { IncomingHttpHeaders } from 'http'; 
import { Request } from 'express'; 

export function prepareHeadersForForwarding(
  originalHeaders: IncomingHttpHeaders,
  method: string,
  body: any,
): Record<string, string> {
  const headersToForward: Record<string, string> = {};

  // Iterate over original headers and copy them
  for (const key in originalHeaders) {
    if (Object.prototype.hasOwnProperty.call(originalHeaders, key)) {
      // Ensure header values are strings, as Axios headers object expects string values
      const value = originalHeaders[key];
      if (typeof value === 'string') {
        headersToForward[key] = value;
      } else if (Array.isArray(value)) {
        // Handle array values (e.g., 'set-cookie') by joining them,
        // or choose to forward only the first one if appropriate for your use case.
        headersToForward[key] = value.join(', ');
      }
    }
  }

  // --- Filter out problematic headers ---
  // These headers are typically managed by Axios or are specific to the client-gateway connection.
  delete headersToForward['host'];           // Axios sets this based on the target URL
  delete headersToForward['connection'];     // Often 'keep-alive', can cause issues with proxying
  delete headersToForward['content-length']; // Axios calculates this for the outgoing request
  delete headersToForward['accept-encoding']; // Prevents double-compression issues if gateway also compresses

  // --- Special handling for Content-Type ---
  // content-type is correctly set for POST/PUT/PATCH requests if a body exists
  // and content-type was not explicitly set or was stripped.
  const httpMethod = method.toUpperCase();
  if ((httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') && body) {
    if (!headersToForward['content-type']) {
      // Default to JSON if a body is present and no content-type was specified
      headersToForward['content-type'] = 'application/json';
    }
  }

  return headersToForward;
}